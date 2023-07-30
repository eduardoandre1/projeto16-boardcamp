const rent_list_join = `
        SELECT rentals.*,
                games.id As "gameindentific",games.name AS "game_name",
                customers.id AS "userid",customers.name AS "client" 
                FROM games 
        JOIN rentals 
            ON games.id = rentals."gameId" 
        JOIN  customers
            ON customers.id = rentals."customerId";`
export default rent_list_join