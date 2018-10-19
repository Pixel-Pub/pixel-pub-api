export default `
    SELECT
        ms.*,
        m.type,
        m.name,
    FROM
        bungie_membership ms
    JOIN
        winpixelpub.bungie_member m
    ON
        m.id = ms.member_id and
        ms.deleted = 0 and
        ms.bungie_clan_id = :clanId
`