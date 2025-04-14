desc usuários;

SELECT *
    FROM usuários;


INSERT INTO usuários (Nome, Email, Senha, Endereço, Telefone, CPF)
    VALUES('Otávio Seidinger', 'orseidinger@gmail.com', '12345678', 'Jacob Hartheman 351', '14997460330', '46967010811');

    UPDATE usuários
        SET nome ="João"
    WHERE idusuário = 1;

    DELETE FROM usuários WHERE idusuário =1;