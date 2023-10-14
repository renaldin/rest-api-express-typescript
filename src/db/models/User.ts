import { DataTypes, Model, Optional } from "sequelize"
import connection from "../../config/dbConnect"
import Role from "./Role"

interface RoleAttributes {
  id?: number,
  name?: string | null,
  email?: string | null,
  roleId?: number | null,
  password?: string | null,
  accessToken?: string | null,
  verified?: boolean | null,
  active?: boolean | null,

  createdAt?: Date,
  updatedAt?: Date
}

export interface RoleInput extends Optional<RoleAttributes, 'id'>{}
export interface RoleOutput extends Required<RoleAttributes>{}

class User extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number
  public name!: string | null
  public email!: string | null
  public roleId!: number | null
  public password!: string | null
  public accessToken!: string | null
  public verified!: boolean | null
  public active!: boolean | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING
  },
  roleId: {
    allowNull: true,
    type: DataTypes.BIGINT
  },
  password: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  accessToken: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  verified: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  },
  active: {
    allowNull: true,
    type: DataTypes.BOOLEAN
  }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
})

User.belongsTo(Role, { foreignKey: 'roleID' })

export default User