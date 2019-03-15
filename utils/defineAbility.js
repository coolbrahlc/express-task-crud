const { AbilityBuilder, Ability } = require('@casl/ability');


module.exports  = (req) => {
    const { rules, can, cannot } = AbilityBuilder.extract();

    let user = req.headers.role;

    if (user==0) {

        can(['create','delete'], 'User', {_id: req.headers.id});
        console.log(req.headers.id);
        console.log("role =0");

    } else if (user==1) {
        can(['read', 'delete', 'create', 'update'], 'User');
        console.log("role =1");

        //can('manage', 'Post', { author: 'me' })
        //cannot('delete', 'Post')

    } else{
        can('read', 'all');
        console.log("role =2");
    }

    return new Ability(rules)
};