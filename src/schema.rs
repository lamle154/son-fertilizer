// @generated automatically by Diesel CLI.

diesel::table! {
    categories (id) {
        id -> Text,
        name -> Text,
        detail -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    customers (id) {
        id -> Text,
        name -> Text,
        phone_number -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    order_items (id) {
        id -> Text,
        order_id -> Text,
        product_id -> Text,
        quantity -> Integer,
        unit_price -> Float,
        total_price -> Float,
        created_at -> Timestamp,
    }
}

diesel::table! {
    orders (id) {
        id -> Text,
        order_date -> Date,
        customer_id -> Text,
        total_amount -> Float,
        payment_type -> Text,
        payment_status -> Text,
        paid_amount -> Nullable<Float>,
        debt_amount -> Nullable<Float>,
        created_at -> Timestamp,
    }
}

diesel::table! {
    products (id) {
        id -> Text,
        name -> Text,
        category_id -> Text,
        selling_price -> Float,
        unit -> Text,
        imageUrl -> Nullable<Text>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}

diesel::table! {
    stock_ins (id) {
        id -> Text,
        product_id -> Text,
        import_date -> Date,
        stock_in_price -> Float,
        quantity -> Integer,
        created_at -> Timestamp,
    }
}

diesel::joinable!(order_items -> orders (order_id));
diesel::joinable!(order_items -> products (product_id));
diesel::joinable!(orders -> customers (customer_id));
diesel::joinable!(products -> categories (category_id));
diesel::joinable!(stock_ins -> products (product_id));

diesel::allow_tables_to_appear_in_same_query!(
    categories,
    customers,
    order_items,
    orders,
    products,
    stock_ins,
);
