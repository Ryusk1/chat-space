class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  validates :name, presence: true
  has_many :massages
  has_many :group_users
  has_many :groups, through: :group_users
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
