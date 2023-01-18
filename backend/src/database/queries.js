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

    // join
    'get_all_deposits': function() {
        return 'SELECT first_name, last_name, schedule_start, schedule_end, x_pos, y_pos FROM deposits INNER JOIN employees ON deposits.manager_id = employees.id_employee;';
    },

    'insert_deposit': function(x_pos, y_pos, email, schedule_start, schedule_end) {
        return `INSERT INTO deposits (x_pos, y_pos, manager_id, schedule_start, schedule_end) VALUES('${x_pos}', '${y_pos}', (SELECT id_employee FROM employees WHERE email='${email}'),'${schedule_start}','${schedule_end}');`;
    },

    // join
    'get_all_vehicles': function() {
        return 'SELECT employees.email, vehicles.model, vehicles.county, vehicles.number, vehicles.alpha_characters FROM vehicles INNER JOIN employees ON vehicles.driver_id = employees.id_employee;';
    },

    // complex
    'insert_vehicle': function(email, model, county, number, chars) {
        return `INSERT INTO vehicles (driver_id, model, county, number, alpha_characters) VALUES((SELECT id_employee FROM employees WHERE email='${email}'),'${model}','${county}', '${number}', '${chars}');`;
    },

    'insert_package': function(weight, cost, sender_email, receiver_email, date_added) {
        return `INSERT INTO packages (weight, cost, sender_id, receiver_id, driver_id, date_added) VALUES ('${weight}', '${cost}',(SELECT id_client FROM clients WHERE email='${sender_email}'), (SELECT id_client FROM clients WHERE email='${receiver_email}'), NULL, '${date_added}');`;
    },

    // join
    'get_all_packages': function() {
        return `SELECT DISTINCT P.weight, P.cost, CONCAT(C1.first_name, ' ', C1.last_name) AS SenderName, CONCAT(C2.first_name, ' ', C2.last_name) AS ReceiverName
        FROM packages P, package_status PS, status S, clients C1, clients C2, employees E 
        WHERE PS.status_id = S.id_status AND P.id_package = PS.package_id AND C1.id_client = P.sender_id AND C2.id_client = P.receiver_id;`
    },

    // join + complex
    'get_all_packages_picked_by_a_driver': function(driver_email) {
        return `SELECT *
        FROM packages P, package_status PS, status S
        WHERE P.id_package = PS.package_id AND PS_status_id = '1' AND P.driver_id IN (
            SELECT id_employee
            FROM employees
            WHERE email = '${driver_email}'
        ); `
    },

    // join + complex
    'get_all_packages_delivered_by_a_driver': function(driver_email) {
        return `SELECT *
        FROM packages P, package_status PS, status S
        WHERE P.id_package = PS.package_id AND PS_status_id = '2' AND P.driver_id IN (
            SELECT id_employee
            FROM employees
            WHERE email = '${driver_email}'
        ); `
    }
}