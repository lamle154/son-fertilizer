pub(crate) mod category_commands;

pub fn register_commands(builder: tauri::Builder<tauri::Wry>) -> tauri::Builder<tauri::Wry> {
    builder.invoke_handler(tauri::generate_handler![
        category_commands::fetch_categories,
        category_commands::insert_category
    ])
}