export class Game {
    ec2Position = [0, 0]
    vpcPosition = [10,0]
    observers = []
    observe(o) {
      this.observers.push(o)
      this.emitChange()
      return () => {
        this.observers = this.observers.filter((t) => t !== o)
      }
    }
    moveec2(toX, toY) {
      this.ec2Position = [toX, toY]
      this.emitChange()
    }
    movevpc(toX, toY) {
      this.vpcPosition = [toX, toY]
      this.emitChange()
    }
    
    emitChange() {
      const posEc2 = this.ec2Position
      const posVpc = this.vpcPosition
      this.observers.forEach((o) => o && o(posVpc))
    }
  }
  