const Memo = require("../models/memo")

exports.create = async (req, res) => {
    try {
        //Getting the number of existing Memos.
        const memoCount = await Memo.find().count();

        //Creating a new memo
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0, // For moving the memo by drag&drop.
        });
        res.status(201).json(memo);
    } catch {
        res.status(500).json(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        const memos = await Memo.find({ user: req.user._id }).sort("-position");
        res.status(200).json(memos);
    } catch {
        res.status(500).json(err);
    }
};

exports.getOne = async (req, res) => {
    const {memoId} = req.params;
    try {
        const memo = await Memo.findOne({user: req.user._id, _id: memoId});
        if(!memo) return res.status(404).json("Cannot find the memo:(");
        res.status(200).json(memo);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const {memoId} = req.params;
    const {title, description} = req.body;
    try {
        if(title === "") req.body.title = "New memo";
        if(description === "") req.body.title = "Write your memo here.";
        
        const memo = await Memo.findOne({user: req.user._id, _id: memoId});
        if(!memo) return res.status(404).json("Cannot find the memo:(");
        
        const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
            $set: req.body,
        });

        res.status(200).json(updatedMemo);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    const {memoId} = req.params;
    try {
        const memo = await Memo.findOne({user: req.user._id, _id: memoId});
        if(!memo) return res.status(404).json("Cannot find the memo:(");
        
        await Memo.deleteOne({_id: memoId});
        res.status(200).json("You deleted the memo.");
    } catch (err) {
        res.status(500).json(err);
    }
};