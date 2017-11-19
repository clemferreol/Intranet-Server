'use strict';

const Collaborateur = require('./CollaborateurModel');

module.exports = {
    findAll : (req, res) => {
        Collaborateur.find({})
            .exec()
            .then(collaborateurs => {
                if(collaborateurs === null){
                    return res.status(500).json({error:1,message:'Aucun collaborateur trouvé'})
                }
                res.json(collaborateurs)
            })
            .catch(err => res.status(500).json({error:1,message: err.message}));
    },

    findById : (req, res) => {
        Collaborateur.findById(req.params.id)
            .exec()
            .then(collaborateur => {
                if(collaborateur === null){
                    return res.status(500).json({error:1,message:'Aucun collaborateur trouvé'})
                }
                res.json(collaborateur)
            })
            .catch(err => res.status(500).json({error:1,message: err.message}));
    },

    create : (req, res) => {
        Collaborateur
            .create(req.body)
            .then(collaborateur => res.json({success:1, message: 'Collaborateur créé', inserted: collaborateur}))
            .catch(err => res.status(500).json({error:1,message:err.message}));
    },

    update : (req, res) => {
        Collaborateur.findByIdAndUpdate(req.params.id, req.body, {new:true} )
            .exec()
            .then(collaborateur => {
                if(collaborateur === null){
                    return res.status(500).json({error:1,message:'Collaborateur non trouvé'})
                }
                res.json(collaborateur)
            })
            .then(collaborateur => res.json({success:1, message: 'Collaborateur modifié', inserted: collaborateur}))
            .catch(err => res.status(500).json({error:1,message:err.message}));
    },

    remove : (req, res) => {
        let id = req.params.id;
        Collaborateur
            .findByIdAndRemove(id)
            .exec()
            .then(function(deletedCollaborateur){
                res.json({success:1, message:'Collaborateur supprimée', deleted: deletedCollaborateur})
            })
            .catch(function(err){
                res.status(500).json({error:1, message:err.message})
            })
    }
};
