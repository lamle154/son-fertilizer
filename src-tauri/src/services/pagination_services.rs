#[derive(serde::Serialize, Debug)]
pub struct Pagination {
    pub page: i64,
    pub size: i64,
    pub total: i64,
}

pub fn calculate_pagination(page: i64, size: i64, total: i64) -> Pagination {
    let total_pages = (total as f64 / size as f64).ceil() as i64;
    return Pagination {
        page,
        size,
        total: total_pages,
    };
}
