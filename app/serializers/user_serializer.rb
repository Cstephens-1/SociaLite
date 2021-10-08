class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :admin, :bio
end
