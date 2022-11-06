module.exports = {
    'insert_client': function(first, last, email, password, client_code) {
        return `INSERT INTO clients (first_name, last_name, email, password, client_code) VALUES('${first}', '${last}', '${email}', '${password}', '${client_code}');`
    },

    'select_client': function(email) {
        return `SELECT * FROM clients WHERE email='${email}' LIMIT 1;`
    },

    'update_client_personal': function(email, phone_number, city, zip_code, street_name, street_number, county) {
        return `UPDATE clients SET phone_number = '${phone_number}', city = '${city}', zip_code = '${zip_code}', street = '${street_name}', street_number = ${street_number}, county = '${county}' WHERE email = '${email}';`
    },
    
    'select_employee': function(email) {
        return `SELECT * FROM employees WHERE email='${email}' LIMIT 1;`
    },

    'get_all_employees': function() {
        return `SELECT * FROM employees;`;
    },

    'add_employee': function(first_name, last_name, email, phone_number, city, county, zip_code, password, street, wage, role, street_number, ssn) {
        return `INSERT INTO employees (first_name, last_name, email, phone_number, city, county, zip_code, password, street, wage, role, street_number, ssn) VALUES('${first_name}', '${last_name}', '${email}', '${phone_number}', '${city}', '${county}', '${zip_code}', '${password}', '${street}', '${wage}', '${role}', '${street_number}', '${ssn}');`
    },
    
    'update_employee': function(first_name, last_name, email, phone_number, city, county, zip_code, street, wage, role, street_number, ssn) {
        return `UPDATE employees SET first_name='${first_name}', last_name='${last_name}', email='${email}', phone_number='${phone_number}', city='${city}', county='${county}', zip_code='${zip_code}', street='${street}', wage='${wage}', role='${role}', street_number='${street_number}', ssn='${ssn}' WHERE email='${email}';`
    },

    'get_all_deposits': function() {
        return 'SELECT * FROM deposits INNER JOIN employees ON deposits.manager_id = employees.id_employee;';
    },

    'insert_deposit': function(x_pos, y_pos, email, schedule_start, schedule_end) {
        return `INSERT INTO deposits (x_pos, y_pos, manager_id, schedule_start, schedule_end) VALUES('${x_pos}', '${y_pos}', (SELECT id_employee FROM employees WHERE email='${email}'),'${schedule_start}','${schedule_end}');`;
    }
}