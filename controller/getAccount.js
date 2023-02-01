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

module.exports.account_pagination = async (req, res, next) => {
  try{
    let n_cursor = req.query.nextCursor
    let size = parseInt(req.query.size)
    const list_account = []
    if (n_cursor) {
      const querydb = await db.collection('account').orderBy('id')
                              .startAt(n_cursor)
                              .limit(size+1)
                              .get()
      querydb.forEach((doc) => list_account.push(doc.data()))
    }
    else {
      const querydb = await db.collection('account').orderBy('id')
                              .limit(size+1)
                              .get()
      querydb.forEach((doc) => list_account.push(doc.data()))
    }
    return res.status(200).json({
      data: list_account.slice(0,size),
      nextCursor: list_account[size].id,
      size: size   
    })
    } 
  catch(error){
      return res.status(500).json(error.message);
    } 
}

