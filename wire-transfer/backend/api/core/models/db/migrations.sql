 CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE PLPGSQL;

DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            firstName VARCHAR(128),
            lastName VARCHAR(128),
            email VARCHAR(128) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            type VARCHAR(10) NOT NULL DEFAULT 'client',
            isAdmin BOOLEAN NOT NULL DEFAULT false,
           created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            
        );
        DROP TABLE IF EXISTS accounts CASCADE;
        CREATE OR REPLACE FUNCTION acc_generator(OUT result bigint) AS $$
        DECLARE
            def_acc bigint := 2220220201;
            last_id integer;
        BEGIN
            SELECT id FROM accounts ORDER BY created_at DESC LIMIT 1 INTO last_id;
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
            balance NUMERIC(20, 2) DEFAULT 0.00,
            balanceNaira NUMERIC(20, 2) DEFAULT 0.00,
            balanceEuros NUMERIC(20, 2) DEFAULT 0.00,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            
        );
        DROP TABLE IF EXISTS transactions CASCADE;
        CREATE OR REPLACE FUNCTION change_account_balance() RETURNS trigger AS $$
        BEGIN
            UPDATE accounts SET balance=NEW.newbalance WHERE accountnumber=NEW.accountnumber;
            UPDATE accounts SET balanceNaira=NEW.newbalanceNaira WHERE accountnumber=NEW.accountnumber;
            UPDATE accounts SET balanceEuros=NEW.newbalanceEuros WHERE accountnumber=NEW.accountnumber;
            RETURN NEW;
        END;
        $$ LANGUAGE PLPGSQL;

       
        CREATE TABLE transactions(
            id SERIAL NOT NULL UNIQUE PRIMARY KEY,
            accountNumber BIGINT NOT NULL REFERENCES accounts(accountNumber) ON DELETE CASCADE,
            senderId VARCHAR(200) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
            transactionType VARCHAR(10) NOT NULL,
            amount NUMERIC(20, 2) DEFAULT 0.00,
            exchangeAmount NUMERIC(10, 2) DEFAULT 0.00,
            rate NUMERIC(20, 2) DEFAULT 0.00,
            oldBalance NUMERIC(20, 2) DEFAULT 0.00,
            newBalance NUMERIC(20, 2) DEFAULT 0.00,
            oldBalanceNaira NUMERIC(20, 2) DEFAULT 0.00,
            newBalanceNaira NUMERIC(20, 2) DEFAULT 0.00,
            oldBalanceEuros NUMERIC(20, 2) DEFAULT 0.00,
            newBalanceEuros NUMERIC(20, 2) DEFAULT 0.00,
            formCurrency VARCHAR(10)  DEFAULT 'USD' ,
            toCurrency VARCHAR(10)  DEFAULT 'USD' ,
            receipientId VARCHAR(100) NOT NULL, 
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            completed_at TIMESTAMPTZ

        );
        CREATE TRIGGER new_transactions_entry
        AFTER INSERT
        ON transactions
        FOR EACH ROW
        EXECUTE PROCEDURE change_account_balance();



        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();


        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON accounts
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();


        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON transactions
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();




INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('juwavictor@gmail.com','Saladin','Jake','$2b$15$7MVuDh8nspFt4TBdDRpuzOWwMlZkd7Bl0yiyBR0b7R26szlymBPoG','staff',true);
INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('danielwallen@gmail.com','Daniel','Wallen','$2b$15$7MVuDh8nspFt4TBdDRpuzOWwMlZkd7Bl0yiyBR0b7R26szlymBPoG','staff',false);
INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('test@gmail.com','Solomon','Grandy','$2b$15$7MVuDh8nspFt4TBdDRpuzOWwMlZkd7Bl0yiyBR0b7R26szlymBPoG','client',false);
-- The company owner of the application should have funded amount of money in the account wallet 
INSERT INTO users (email, firstName, lastName, password, type, isAdmin) values ('simba@gmail.com','Company','Boss','$2b$15$7MVuDh8nspFt4TBdDRpuzOWwMlZkd7Bl0yiyBR0b7R26szlymBPoG','staff',false);

INSERT INTO accounts (accountNumber, owner, type, status, balance, balanceNaira, balanceEuros) values (2220107727,1,'savings','active',0.00,0.00,0.00);
INSERT INTO accounts (accountNumber, owner, type, status, balance, balanceNaira, balanceEuros) values (2220107821,2,'savings','active',0.00,0.00,0.00);
INSERT INTO accounts (accountNumber, owner, type, status, balance, balanceNaira, balanceEuros) values (2220006727,3,'savings','active',0.00,0.00,0.00);
INSERT INTO accounts (accountNumber, owner, type, status, balance, balanceNaira, balanceEuros) values (2225137327,4,'savings','active',300000000000.00,0.00,0.00);


-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros,receipientId) values (2220006727,4,'debit',100000.00,100000.00,1.00,1100000.00,1000000.00,0.00,0.00,0.00,0.00,'juwavictor@gmail.com');
-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros, receipientId) values (2220006727,4,'debit',100000.00,100000.00,1.00,1000000.00,900000.00,0.00,0.00,0.00,0.00,'juwavictor@gmail.com');
-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros, receipientId) values (2220006727,4,'debit',100000.00,100000.00,1.00,900000.00,800000.00,0.00,0.00,0.00,0.00,'test@gmail.com');
-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros, receipientId) values (2220006727,4,'debit',100000.00,100000.00,1.00,800000.00,700000.00,0.00,0.00,0.00,0.00,'juwavictor@gmail.com');
-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros, receipientId) values (2220107727,1,'credit',100000.00,100000.00,1.00,0.00,100000.00,0.00,0.00,0.00,0.00,'juwavictor@gmail.com');
-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros, receipientId) values (2220107727,1,'credit',200000.00,200000.00,1.00,100000.00,300000.00,0.00,0.00,0.00,0.00,'juwavictor@gmail.com');
-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros, receipientId) values (2220107821,2,'credit',100000.00,100000.00,1.00,300000.00,400000.00,0.00,0.00,0.00,0.00,'danielwallen@gmail.com');
-- INSERT INTO transactions (accountNumber, senderId, transactionType, amount, exchangeAmount, rate, oldBalance, newBalance,oldBalanceNaira, newBalanceNaira, oldBalanceEuros,newBalanceEuros, receipientId) values (2225137327,4,'credit',100000.00,100000.00,1.00,0.00,100000.00,0.00,0.00,0.00,0.00,'test@gmail.com');







