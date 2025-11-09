use diesel::prelude::*;

use crate::errors::DatabaseError;
use crate::schema::categories::dsl;
use crate::{db::establish_db_connection, models::categories::Category};

pub fn fetch_categories(search: String, page: i64, size: i64) -> (Vec<Category>, i64) {
    let connection = &mut establish_db_connection();

    let querier = dsl::categories.filter(dsl::name.like(format!("%{}%", search)));

    let categories = querier
        .clone()
        .limit(size)
        .offset((page - 1) * size)
        .load::<Category>(connection)
        .expect("Error loading categories");

    let count = querier
        .count()
        .get_result::<i64>(connection)
        .expect("Error counting categories");

    return (categories, count);
}

pub fn insert_category(category: &Category) -> Result<(), DatabaseError> {
    let connection = &mut establish_db_connection();

    diesel::insert_into(dsl::categories)
        .values(category)
        .execute(connection)
        .map_err(|error| DatabaseError::from_diesel_error(error))?;

    Ok(())
}
