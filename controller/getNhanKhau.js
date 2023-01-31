const {db} = require('../config/firebase');
const size = 1

module.exports.nhankhau_pagination = async (req, res, next) => {
    try{
        const page = parseInt(req.query.page)
        const first = await db.collection('nhankhau').orderBy('id')
                            .limit(size*page)
                            .get()
        const last = first.docs[first.docs.length -1];
        const list_account = []
        const querydb = await db.collection('nhankhau').orderBy('id')
                                .startAfter(last.data().id)
                                .limit(size).get()
        querydb.forEach((doc) => list_account.push(doc.data()))
        return res.status(200).json(list_account)
    } catch(error){
        return res.status(500).json(error.message);
    }
    
}