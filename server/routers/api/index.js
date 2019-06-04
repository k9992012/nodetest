const Router = require('koa-router');
let router = new Router();
// router.get('/add/:id', async ctx => {
//   let {id} = ctx.params;
//   ctx.body = await ctx.db.query("SELECT ID, title FROM students WHERE id=?", [id]);
// });
router.get('/students', async ctx => {
  ctx.body = await ctx.db.query("SELECT * FROM students");
});
router.post('/add', async ctx => {
  let post = ctx.request.fields;
  await ctx.db.query(
    "INSERT INTO students (class_id,name,gender,score) VALUES(?, ?, ?, ?)",
    [post['class_id'], post['name'], post['gender'], post['score']]
  );
  ctx.body = {err: 0}
});
router.post('/del', async ctx => {
  let post = ctx.request.fields;
  await ctx.db.query("DELETE FROM students WHERE id=?", post['id']);
  ctx.body = {err: 0}
});
router.get('/update', async ctx => {
  await ctx.db.query('UPDATE students SET score=?, class_id=? WHERE id=11', [100, 2]);
  ctx.body = {err: 0}
});
module.exports = router.routes();
