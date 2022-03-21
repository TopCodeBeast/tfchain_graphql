import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import {Farm} from "./farm.model"

@Entity_()
export class PublicIp {
  constructor(props?: Partial<PublicIp>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @Index_()
  @ManyToOne_(() => Farm, {nullable: false})
  farm!: Farm

  @Column_("text", {nullable: false})
  gateway!: string

  @Column_("text", {nullable: false})
  ip!: string

  @Column_("integer", {nullable: false})
  contractId!: number
}
