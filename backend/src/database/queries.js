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
        return `SELECT first_name, last_name, schedule_start, schedule_end, x_pos, y_pos FROM deposits
                 INNER JOIN employees ON deposits.manager_id = employees.id_employee;`;
    },

    'insert_deposit': function(x_pos, y_pos, email, schedule_start, schedule_end) {
        return `INSERT INTO deposits (x_pos, y_pos, manager_id, schedule_start, schedule_end) VALUES('${x_pos}', '${y_pos}', (SELECT id_employee FROM employees WHERE email='${email}'),'${schedule_start}','${schedule_end}');`;
    },

    // join
    'get_all_vehicles': function() {
        return `SELECT employees.email, vehicles.model, vehicles.county, vehicles.number, vehicles.alpha_characters FROM vehicles 
                       INNER JOIN employees ON vehicles.driver_id = employees.id_employee;`;
    },

    // complex
    'insert_vehicle': function(email, model, county, number, chars) {
        return `INSERT INTO vehicles (driver_id, model, county, number, alpha_characters) 
                VALUES((SELECT id_employee FROM employees WHERE email='${email}'),'${model}','${county}', '${number}', '${chars}');`;
    },

    'insert_package': function(weight, cost, sender_email, receiver_email, date_added) {
        return `INSERT INTO packages (weight, cost, sender_id, receiver_id, driver_id, date_added) VALUES ('${weight}', '${cost}',
                (SELECT id_client FROM clients WHERE email='${sender_email}'), 
                (SELECT id_client FROM clients WHERE email='${receiver_email}'), NULL, '${date_added}');`;
    },

    // join
    'get_all_packages_with_driver': function() {
        return `SELECT DISTINCT P.id_package, P.weight, P.cost, S.status, CONCAT(C1.first_name, ' ', C1.last_name) AS SenderName, 
        CONCAT(C2.first_name, ' ', C2.last_name) AS ReceiverName, 
        CONCAT(E.first_name, ' ', E.last_name) AS employeeName, P.date_added, P.date_delivered
        FROM packages P, package_status PS, status S, clients C1, clients C2, employees E 
        WHERE P.driver_id = E.id_employee AND
              PS.status_id = S.id_status AND
              P.id_package = PS.package_id AND 
              C1.id_client = P.sender_id AND 
              C2.id_client = P.receiver_id ;`
    },

    'get_all_packages_without_driver': function() {
        return `SELECT DISTINCT P.id_package, P.weight, P.cost, S.status, 
        CONCAT(C1.first_name, ' ', C1.last_name) AS SenderName, 
        CONCAT(C2.first_name, ' ', C2.last_name) AS ReceiverName, P.date_added
        FROM packages P, package_status PS, status S, clients C1, clients C2, employees E 
        WHERE P.driver_id IS NULL AND
              PS.status_id = S.id_status AND
              P.id_package = PS.package_id AND 
              C1.id_client = P.sender_id AND 
              C2.id_client = P.receiver_id;`
    },

    // join + complex
    'get_all_packages_picked_by_a_driver': function(driver_email) {
        return `SELECT P.id_package, P.weight, P.cost, S.status, P.date_added, P.date_delivered, 
        CONCAT(C1.first_name, ' ', C1.last_name) AS SenderName, CONCAT(C2.first_name, ' ', C2.last_name) AS ReceiverName
        FROM packages P, package_status PS, status S, clients C1, clients C2
        WHERE P.id_package = PS.package_id AND
              PS.status_id = '1' AND
              S.id_status = '1' AND
              C1.id_client = P.sender_id AND 
              C2.id_client = P.receiver_id AND
              P.driver_id IN (
                SELECT id_employee
                FROM employees
                WHERE email = '${driver_email}'
              );`
    },

    // join + complex
    'get_all_packages_delivered_by_a_driver': function(driver_email) {
        return `SELECT P.id_package, P.weight, P.cost, S.status, P.date_added, P.date_delivered, 
        CONCAT(C1.first_name, ' ', C1.last_name) AS SenderName, CONCAT(C2.first_name, ' ', C2.last_name) AS ReceiverName
        FROM packages P, package_status PS, status S, clients C1, clients C2
        WHERE P.id_package = PS.package_id AND
              PS.status_id = '2' AND
              S.id_status = '2' AND
              C1.id_client = P.sender_id AND 
              C2.id_client = P.receiver_id AND
              P.driver_id IN (
                SELECT id_employee
                FROM employees
                WHERE email = '${driver_email}'
              );`
    },

    'get_all_packages_delivered_by_a_driver_filter_id': function(driver_email) {
        return `SELECT *
        FROM packages P, package_status PS, status S
        WHERE P.id_package = PS.package_id AND PS.status_id = '2' AND P.driver_id IN (
            SELECT id_employee
            FROM employees
            WHERE email = '${driver_email}'
        ); `
    },

    'delete_package': function(package_id) {
        return `DELETE FROM packages WHERE id_package = '${package_id}';`
    },

    'delete_package_status': function(package_id) {
        return `DELETE FROM package_status WHERE package_id = '${package_id}';`
    },

    'insert_package_status': function(package_id) {
        return `INSERT INTO package_status(package_id, status_id) VALUES(${package_id}, 4);`
    },

    'update_package_status': function(package_id, status_id) {
        return `UPDATE package_status SET status_id = '${status_id}' WHERE package_id = '${package_id}';` 
    },

    'update_package_driver': function(package_id, driver_email) {
        return `UPDATE packages SET driver_id = (SELECT id_employee FROM employees WHERE email = '${driver_email}') WHERE id_package = '${package_id}';`
    },

    'update_package_date_delivered': function(package_id, date_delivered) {
        return `UPDATE packages SET date_delivered = '${date_delivered}' WHERE id_package = '${package_id}';`
    },

    'get_client_number_of_sent_packages': function() {
        return `SELECT  C.first_name, C.last_name, COUNT(*) AS number_of_sent_packages
                FROM clients C, packages P
                WHERE C.id_client = P.sender_id
                GROUP BY C.first_name, C.last_name;`
    },

    // average delivery time for each courier
    'get_average_delivery_time': function() {
        return `SELECT CONCAT(E.first_name, ' ', E.last_name) AS employeeName, 
                (SELECT AVG(DATEDIFF(P.date_delivered, P.date_added))
                 FROM packages P
                 WHERE P.driver_id = E.id_employee) AS average_delivery_time
                FROM employees E;`;
    },

    // name and delivery count of every employee who delivered more than 5 packages
    'get_stats_more_than_5_pack': function() {
        return `SELECT CONCAT(E.first_name, ' ', E.last_name) AS employeeName, COUNT(P.id_package) as packagesCount
                FROM employees E, packages P
                WHERE P.driver_id = E.id_employee AND E.id_employee IN (
                    SELECT P.driver_id FROM packages P
                    GROUP BY P.driver_id
                    HAVING COUNT(P.id_package) >= 5
                )
                GROUP BY E.id_employee;`
    },

    // name of the couriers that delivered packages to more than one client and have a delivery rate higher than 70%
    'get_stats_delivery_rate': function() {
        return `SELECT CONCAT(E.first_name, ' ', E.last_name) AS employeeName, COUNT(DISTINCT P.receiver_id) AS deliveries, E.id_employee
                FROM employees E, packages P, package_status PS
                WHERE P.driver_id = E.id_employee AND PS.package_id = P.id_package AND PS.status_id = '2'
                GROUP BY employeeName, E.id_employee
                HAVING deliveries > 1 AND COUNT(*) / (SELECT COUNT(*) FROM packages WHERE driver_id = id_employee);`;
    }

}