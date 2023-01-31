const {db} = require('../config/firebase');

module.exports.getAllAccount = async (req, res) => {
  try {
    const allEntries = [];
    const querySnapshot = await db.collection('account').get();
    querySnapshot.forEach( (doc) => allEntries.push(doc.data()));
    return res.status(200).json(allEntries);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const size = 3

module.exports.account_pagination = async (req, res, next) => {
    try{
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
    } catch(error){
      return res.status(500).json(error.message);
    }
    
    
}

