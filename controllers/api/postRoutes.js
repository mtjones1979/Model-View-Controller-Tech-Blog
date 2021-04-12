//used user as layout and adjusted to Post needs
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// router.get('/', (req, res) => {
//     Post.findAll({
//         attributes: ['id', 'title', 'content', 'created_at'],
//         order: [
//             ['created_at', 'DESC']
//         ],
//         include: [{
//             model: User,
//             attributes:['username']
//         },
//         {
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//                 model: User,
//                 attributes: ['username']
//             }
//         }]
//     })
//     .then(dbPostData => res.json(dbPostData.reverse()))
//     .catch(err => {res.status(500).json('This didnt work!')});
// });

// router.get('/:id', (req, res) => {
//     Post.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: ['id', 'title', 'content', 'created_at'],
//         include: [{
//             model: User,
//             attributes:['username']
//         },
//         {
//             model: Comment,
//             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//             include: {
//                 model: User,
//                 attributes: ['username']
//             }
//         }]
//     })
//     .then(dbPostData => {
//     if (!dbPostData) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }
//     res.json(dbPostData);
//     })
//     .catch(err => {res.status(500).json('This didnt work!')});
// });
router.get('/new', (req,res) => {
    res.render('newPost');
});
router.post('/new', (req, res) => {
    console.log(res.session.user_id);
    console.log(req.body);
    Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {res.status(500).json('This did not work')});
});

router.put('/:id', withAuth, (req, res) => {
    Post.update(
    {
        title: req.body.title,
        content: req.body.content
    }, 
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData[0]) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
    }
        res.json(dbPostData);
    })
    .catch(err => {res.status(500).json(err)});
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {res.status(500).json('This didnt work!')});
});

module.exports = router;