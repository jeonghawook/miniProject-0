const { all } = require("../routes/comments.route");
const CommentsService = require("../services/comments.service");
const errorWithCode = require("../utils/error");

class CommentsController {
    commentsService = new CommentsService();

    allComments = async (req, res) => {
        const { _postId } = req.params;
        try {
            const allComments = await this.commentsService.allComments(_postId);

            return res.status(200).json({ allComments });
        } catch (e) {
            console.log(e);
            e.failedApi = "댓글 조회";
            next(e);
        }
    };
    createComment = async (req, res, next) => {
        try {
            if (Object.keys(req.body).length !== 1) {
                throw errorWithCode(412, "데이터 형식이 올바르지 않습니다.");
            }

            const { comment } = req.body;
            const { _postId } = req.params; // saro       @love/25
            const { nickname, userId } = res.locals.user;

            if (!comment || comment === "" || typeof comment !== "string") {
                throw errorWithCode(412, "댓글 형식이 올바르지 않습니다.");
            }

            await this.commentsService.createComment(
                comment,
                _postId,
                nickname,
                userId
            );

            return res.status(201).end();
        } catch (e) {
            e.failedApi = "댓글생성";
            next(e);
        }
    };

    createChildComment = async (req, res, next) => {
        try {
            if (Object.keys(req.body).length !== 1) {
                throw errorWithCode(412, "데이터 형식이 올바르지 않습니다.");
            }

            const { comment } = req.body;
            const { _postId, _commentId } = req.params; // saro       @love/25
            const { nickname, userId } = res.locals.user;

            if (!comment || comment === "" || typeof comment !== "string") {
                throw errorWithCode(412, "댓글 형식이 올바르지 않습니다.");
            }

            await this.commentsService.createChildComment(
                comment,
                _commentId,
                nickname,
                userId,
                _postId
            );

            return res.status(201).end();
        } catch (e) {
            e.failedApi = "댓글생성";
            next(e);
        }
    };

    updateComment = async (req, res, next) => {
        try {
            if (Object.keys(req.body).length !== 1) {
                throw errorWithCode(412, "데이터 형식이 올바르지 않습니다.");
            }

            const { comment } = req.body;
            const { _postId, _commentId } = req.params;
            const { nickname } = res.locals.user;

            if (!comment || comment === "" || typeof comment !== "string") {
                throw errorWithCode(412, "댓글 형식이 올바르지 않습니다");
            }

            await this.commentsService.updateComment(
                comment,
                _postId,
                nickname,
                _commentId
            );

            return res.status(200).end();
        } catch (e) {
            e.failedApi = "댓글수정";
            next(e);
        }
    };

    deleteComment = async (req, res, next) => {
        try {
            const { _postId, _commentId } = req.params;
            const { nickname } = res.locals.user;

            await this.commentsService.deleteComment(
                _commentId,
                nickname,
                _postId
            );

            return res.status(200).end();
        } catch (e) {
            e.failedApi = "댓글삭제";
            next(e);
        }
    };
}

module.exports = CommentsController;
//error try catch =controller
//boolean  true false //userId, nickname 둘다 가져오는걸로
//throw status/message  errorwithcode
