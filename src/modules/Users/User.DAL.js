const userTable = require('../../database/models/User');

exports.findAll = userTable.findAll();

exports.findUser = async (paramId) =>
  await userTable.findOne({ where: { id: paramId } });

exports.createUserTable = async (id, name, email, password) => {
  const userBuild = userTable.build({
    id,
    name,
    email,
    password,
  });
  await userBuild.save();
};

exports.changePass = (hashedPassword, paramId) => {
  userTable.update(
    {
      password: hashedPassword,
    },
    {
      where: {
        id: paramId,
      },
    }
  );
};

exports.delete = (paramId) => {
  userTable.destroy({
    where: {
      id: paramId,
    },
  });
};
