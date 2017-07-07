--------------------------------------------------------
--  DDL for Function GERAID
--------------------------------------------------------

  CREATE OR REPLACE FUNCTION "ANDERSON"."GERAID" (
    EMAIL2 IN VARCHAR2, 
    NOME2 IN VARCHAR2,
    SEXO2 IN VARCHAR2,
    NASC2 IN VARCHAR2,
    SENH2 IN VARCHAR2
) RETURN VARCHAR2 AS 
BEGIN
    DECLARE
    ID VARCHAR2(32);
    SEQ VARCHAR2(32);
    TOKEN VARCHAR(6) := 'sBBHcK';
    BEGIN
    SELECT SEQUENCIAL.NEXTVAL INTO SEQ FROM USUARIO WHERE ROWNUM <= 1;
    ID := rawtohex(dbms_obfuscation_toolkit.md5(input => utl_raw.cast_to_raw( SEQ || CURRENT_DATE || TOKEN )));
    INSERT INTO USUARIO (ID, EMAIL, NOME, SEXO, NASCIMENTO, SENHA)
    VALUES(ID, EMAIL2, NOME2, SEXO2, TO_DATE(NASC2, 'YYYY-MM-DD'), SENH2);
    RETURN ID;
    END;
END GERAID;

/
