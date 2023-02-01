const {db} = require('../config/firebase');
const size = 1

module.exports.nhankhau_pagination = async (req, res, next) => {
    try{
      let n_cursor = req.query.nextCursor
      let size = parseInt(req.query.size)
      const list_nhankhau = []
      if (n_cursor) {
        const querydb = await db.collection('nhankhau').orderBy('id')
                                .startAt(n_cursor)
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_nhankhau.push(doc.data()))
      }
      else {
        const querydb = await db.collection('nhankhau').orderBy('id')
                                .limit(size+1)
                                .get()
        querydb.forEach((doc) => list_nhankhau.push(doc.data()))
      }
      return res.status(200).json({
        data: list_nhankhau.slice(0,size),
        nextCursor: list_nhankhau[size].id,
        size: size   
      })
      } 
    catch(error){
        return res.status(500).json(error.message);
      } 
  }
