

    let ec2Position = [0, 0]
    let observer = []
    
    
    function  observe(o) {
       
    
        observer.push(o)
        emitChange()
        return () => {
            observer = observer.filter((t) => t !== o)
          }
    }
    
    
    export function emitChange() {
        const pos = ec2Position
        observer.forEach((o) => o && o(pos))
    }
    
    export function moveEc2(toX, toY) {
        ec2Position = [toX, toY]
        emitChange()
    }

