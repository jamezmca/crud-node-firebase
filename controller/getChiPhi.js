const {db} = require('../config/firebase');
const size = 1

module.exports.chiphi_pagination = async (req, res, next) => {
    const page = parseInt(req.query.page)
    const first = await db.collection('chiphi').orderBy('fullname')
                        .limit(size*page)
                        .get()
    const last = first.docs[first.docs.length -1];
    const list_account = []
    const querydb = await db.collection('chiphi').orderBy('fullname')
                            .startAfter(last.data().fullname)
                            .limit(size).get()
    querydb.forEach((doc) => list_account.push(doc.data()))
    return res.status(200).json(list_account)
    
}