DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            firstName VARCHAR(128),
            lastName VARCHAR(128),
            email VARCHAR(128) UNIQUE NOT NULL,
            password VARCHAR NOT NULL,
            type VARCHAR(10) NOT NULL DEFAULT 'client',
            isAdmin BOOLEAN NOT NULL DEFAULT false,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW()
        );
        DROP TABLE IF EXISTS accounts CASCADE;
        CREATE OR REPLACE FUNCTION acc_generator(OUT result bigint) AS $$
        DECLARE
            def_acc bigint := 2220220201;
            last_id integer;
        BEGIN
            SELECT id FROM accounts ORDER BY createdOn DESC LIMIT 1 INTO last_id;
            IF last_id IS NULL OR last_id = 0
            THEN
                result:= def_acc;
            ELSE
                result:= (def_acc + last_id + 100);
            END IF;
        END;
        $$ LANGUAGE PLPGSQL;
        CREATE TABLE accounts(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            accountNumber BIGINT UNIQUE DEFAULT acc_generator(),
            owner INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            type VARCHAR(10) NOT NULL,
            status VARCHAR(10) DEFAULT 'dormant' ,
            balance NUMERIC(10, 2) DEFAULT 0.00,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW()
        );
        DROP TABLE IF EXISTS transactions CASCADE;
        CREATE OR REPLACE FUNCTION change_account_balance() RETURNS trigger AS $$
        BEGIN
            UPDATE accounts SET balance=NEW.newbalance WHERE accountnumber=NEW.accountnumber;
            RETURN NEW;
        END;
        $$ LANGUAGE PLPGSQL;
        CREATE TABLE transactions(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            accountNumber BIGINT NOT NULL REFERENCES accounts(accountNumber) ON DELETE CASCADE,
            cashier INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            transactionType VARCHAR(10) NOT NULL,
            amount NUMERIC(10, 2) DEFAULT 0.00,
            oldBalance NUMERIC(10, 2) DEFAULT 0.00,
            newBalance NUMERIC(10, 2) DEFAULT 0.00,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            donor VARCHAR(100) NOT NULL,
            receipient VARCHAR(100) NOT NULL
        );
        CREATE TRIGGER new_transactions_entry
        AFTER INSERT
        ON transactions
        FOR EACH ROW
        EXECUTE PROCEDURE change_account_balance();




INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('juwavictor@gmail.com','Saladin','Jake','$2b$15$EwiDwgtrsJGOtLEQcw3D9uaRi0/eaH3oyE6nzRZXvqsp/NmGi3SsO','staff',true);
INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('danielwallen@gmail.com','Daniel','Wallen','$2b$15$EwiDwgtrsJGOtLEQcw3D9uaRi0/eaH3oyE6nzRZXvqsp/NmGi3SsO','staff',false);
INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('test@gmail.com','Solomon','Grandy','$2b$15$EwiDwgtrsJGOtLEQcw3D9uaRi0/eaH3oyE6nzRZXvqsp/NmGi3SsO','staff',false);
INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('simba@gmail.com','Company','Boss','$2b$15$EwiDwgtrsJGOtLEQcw3D9uaRi0/eaH3oyE6nzRZXvqsp/NmGi3SsO','client',false);

INSERT INTO accounts (accountNumber, owner, type, status, balance) values (2220107727,1,'savings','active',0.00);
INSERT INTO accounts (accountNumber, owner, type, status, balance) values (2220107821,2,'savings','active',0.00);
INSERT INTO accounts (accountNumber, owner, type, status, balance) values (2220006727,3,'savings','active',0.00);
INSERT INTO accounts (accountNumber, owner, type, status, balance) values (2225137327,4,'savings','active',0.00);


INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2220006727,1,'debit',100000.00,1100000.00,1000000.00,'simba@gmail.com','juwavictor@gmail.com');
INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2220006727,1,'debit',100000.00,1000000.00,900000.00,'simba@gmail.com','juwavictor@gmail.com');
INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2220006727,1,'debit',100000.00,900000.00,800000.00,'simba@gmail.com','test@gmail.com');
INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2220006727,1,'debit',100000.00,800000.00,700000.00,'simba@gmail.com','juwavictor@gmail.com');
INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2220107727,1,'credit',100000.00,0.00,100000.00,'simba@gmail.com','juwavictor@gmail.com');
INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2220107727,1,'credit',200000.00,100000.00,300000.00,'simba@gmail.com','juwavictor@gmail.com');
INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2220107821,1,'credit',100000.00,300000.00,400000.00,'simba@gmail.com','danielwollen@gmail.com');
INSERT INTO transactions (accountNumber, cashier, transactionType, amount, oldBalance, newBalance,donor, receipient) values (2225137327,1,'credit',100000.00,0.00,100000.00,'simba@gmail.com','test@gmail.com');




