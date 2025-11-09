use diesel::result::Error as DieselError;
use serde::Serialize;
use std::collections::HashMap;
use std::fmt;

#[derive(Debug)]
pub struct DatabaseError {
    pub field_name: Option<String>,
    pub message: String,
}

// Implement std::error::Error for Tauri error handling
impl std::error::Error for DatabaseError {}

// Implement Display for Error trait requirement
impl fmt::Display for DatabaseError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.message)
    }
}

// Custom Serialize implementation to create {field_name: message} structure
impl Serialize for DatabaseError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut map = HashMap::new();

        if let Some(ref field_name) = self.field_name {
            map.insert(field_name.clone(), self.message.clone());
        } else {
            // If no field name, use a generic key like "error" or "message"
            map.insert("error".to_string(), self.message.clone());
        }

        map.serialize(serializer)
    }
}

impl DatabaseError {
    pub fn from_diesel_error(error: DieselError) -> Self {
        match error {
            DieselError::DatabaseError(kind, info) => {
                match kind {
                    diesel::result::DatabaseErrorKind::UniqueViolation => {
                        // Try to extract the column name from the error message
                        let message = info.message();
                        let column_name = extract_column_from_message(message);

                        DatabaseError {
                            field_name: Some(column_name.unwrap_or_else(|| "name".to_string())),
                            message: "Giá trị đã tồn tại".to_string(),
                        }
                    }
                    diesel::result::DatabaseErrorKind::ForeignKeyViolation => DatabaseError {
                        field_name: None,
                        message: "Lỗi tham chiếu khóa ngoại".to_string(),
                    },
                    diesel::result::DatabaseErrorKind::CheckViolation => DatabaseError {
                        field_name: None,
                        message: "Lỗi ràng buộc dữ liệu".to_string(),
                    },
                    diesel::result::DatabaseErrorKind::NotNullViolation => {
                        let column_name = extract_column_from_message(info.message());
                        DatabaseError {
                            field_name: Some(column_name.unwrap_or_else(|| "name".to_string())),
                            message: "Trường bắt buộc không được để trống".to_string(),
                        }
                    }
                    _ => DatabaseError {
                        field_name: None,
                        message: format!("Lỗi cơ sở dữ liệu: {}", info.message()),
                    },
                }
            }
            DieselError::NotFound => DatabaseError {
                field_name: None,
                message: "Không tìm thấy dữ liệu".to_string(),
            },
            DieselError::QueryBuilderError(e) => DatabaseError {
                field_name: None,
                message: format!("Lỗi truy vấn: {}", e),
            },
            DieselError::DeserializationError(e) => DatabaseError {
                field_name: None,
                message: format!("Lỗi đọc dữ liệu: {}", e),
            },
            DieselError::SerializationError(e) => DatabaseError {
                field_name: None,
                message: format!("Lỗi ghi dữ liệu: {}", e),
            },
            DieselError::RollbackTransaction => DatabaseError {
                field_name: None,
                message: "Lỗi giao dịch đã bị hoàn tác".to_string(),
            },
            DieselError::RollbackErrorOnCommit { .. } => DatabaseError {
                field_name: None,
                message: "Lỗi khi hoàn tác giao dịch".to_string(),
            },
            _ => DatabaseError {
                field_name: None,
                message: format!("Lỗi không xác định: {}", error),
            },
        }
    }
}

// Helper function to extract column name from error message
fn extract_column_from_message(message: &str) -> Option<String> {
    // SQLite error messages often contain column names
    // Example: "UNIQUE constraint failed: categories.name"
    if let Some(start) = message.find(": ") {
        let column_part = &message[start + 2..];
        if let Some(dot_pos) = column_part.find('.') {
            Some(column_part[dot_pos + 1..].to_string())
        } else {
            Some(column_part.to_string())
        }
    } else {
        None
    }
}