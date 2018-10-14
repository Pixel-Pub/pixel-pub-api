export default `
    SELECT
        ms.bungie_member_id,
        ms.destiny_member_id
    FROM
        bungie_membership ms
    JOIN
        winpixelpub.bungie_member m
    ON
        m.id = ms.member_id and
        ms.deleted = 0 and
        m.last_seen <= :date and
        ms.bungie_clan_id = :clanId
`