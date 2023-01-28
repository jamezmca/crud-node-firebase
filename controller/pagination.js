const {db} = require('../config/firebase')
const size = 3

module.exports.pagination = async (req, res, next) => {
    const page = parseInt(req.query.page)
    const first = await db.collection('account').orderBy('id')
                        .limit(size*page)
                        .get()
    const last = first.docs[first.docs.length - 1];
    const list_account = []
    const querydb = await db.collection('account').orderBy('id')
                            .startAfter(last.data().id)
                            .limit(size).get()
    querydb.forEach((doc) => list_account.push(doc.data()))
    return res.status(200).json(list_account)
    
}