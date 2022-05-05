import { Ec2 } from './Ec2 '
export const Piece = ({ isEc2 }) => (isEc2 ? <Ec2 /> : null)