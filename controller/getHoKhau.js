const {db} = require('../config/firebase');
const size = 1

module.exports.hokhau_pagination = async (req, res, next) => {
    try{
      let n_cursor = req.query.nextCursor
      let size = parseInt(req.query.size)
      const list_hokhau = []
      if (n_cursor) {
        console.log(n_cursor);
        const querydb = await db.collection('hokhau').orderBy('id')
                                .startAt(n_cursor)
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_hokhau.push(doc.data()))
      }
      else {
        const querydb = await db.collection('hokhau').orderBy('id')
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_hokhau.push(doc.data()))
      }
      return res.status(200).json({
        data: list_hokhau.slice(0,size),
        nextCursor: list_hokhau[size].id,
        size: size   
      })
      } 
    catch(error){
        return res.status(500).json(error.message);
      } 
  }