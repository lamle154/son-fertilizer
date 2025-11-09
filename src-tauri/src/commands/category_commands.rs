use uuid::Uuid;

use crate::errors::DatabaseError;
use crate::models::categories::Category;
use crate::services::category_services;
use crate::services::pagination_services::{self, Pagination};

#[derive(serde::Serialize)]
pub struct ListCategoriesResponse {
    pub categories: Vec<Category>,
    pub pagination: Pagination,
}

#[tauri::command]
pub fn fetch_categories(search: String, page: i64, size: i64) -> ListCategoriesResponse {
    let (categories, total) = category_services::fetch_categories(search, page, size);
    let pagination = pagination_services::calculate_pagination(page, size, total);
    ListCategoriesResponse {
        categories,
        pagination,
    }
}

#[derive(serde::Deserialize)]
pub struct InsertRequest {
    pub name: String,
    pub detail: Option<String>,
}

#[tauri::command]
pub fn insert_category(params: InsertRequest) -> Result<(), DatabaseError> {
    let category = Category {
        id: Uuid::new_v4().to_string(),
        name: params.name,
        detail: params.detail,
        created_at: chrono::Utc::now().naive_utc(),
        updated_at: chrono::Utc::now().naive_utc(),
    };

    category_services::insert_category(&category)?;

    Ok(())
}
