import { Ec2 } from './Ec2 '
import { Vpc } from './Vpc'
export const Piece = ({ isEc2 }) => (isEc2 ? <Ec2 /> : null)
export const PieceVpc = ({ isVpc }) => (isVpc ? <Vpc /> : null)