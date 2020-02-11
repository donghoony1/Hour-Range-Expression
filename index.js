const GetGE = (W = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'everyday']) => {
    const GE = `((${W.join('|')})\\(((([\\d]|(2[0-4]|(0|1)[\\d]))-([\\d]|(2[0-4]|(0|1)[\\d])))( ([\\d]|(2[0-4]|(0|1)[\\d]))-([\\d]|(2[0-4]|(0|1)[\\d])))*)\\))`;
    const Expression = new RegExp(`^${GE}( ${GE})*$`);
    const Expression_D1 = new RegExp(`${GE}`);
    const EW = (HRE) => HRE.split(Expression_D1).filter(element => Expression_D1.test(element));
    return {W, GE, Expression, Expression_D1, EW};
}

const check = (HRE, CustomWeeks, Callback) => {
    const Result = GetGE(CustomWeeks).Expression.test(HRE);
    if(Callback === undefined) return Result;
    else Callback(null, Result);
}

const match = (HRE, Unixtime, CustomWeeks, Callback) => {
    const GE = GetGE(CustomWeeks);
    if(!check(HRE, GE.W)) return false;
    const DT = new Date(Unixtime * 1000);
    const HR = DT.getHours();
    const PT = DT.getDay();
    const WD = GE.EW(HRE);
    if(WD.length <= 0 || 7 < WD.length) return false;
    if(Callback === undefined) {
        let result = false;
        WD.some((weekdays) => {
            if(GE.W[PT] != weekdays.substring(0, GE.W[PT].length) && weekdays.substring(0, GE.W[7].length) != GE.W[7]) return false;
            let subresult = false;
            weekdays.split('(', 2)[1].split(')', 2)[0].split(' ').forEach((time) => {
                const times = time.split('-');
                if(times[0] <= HR && HR < times[1]) {
                    subresult = true;
                    return true;
                }
            });
            result = subresult;
            if(weekdays.substring(0, GE.W[7].length) != GE.W[7]) return true;
        });
        return result;
    } else {
        new Promise((resolve, reject) => {
            WD.some((weekdays) => {
                if(GE.W[PT] != weekdays.substring(0, GE.W[PT].length) && weekdays.substring(0, GE.W[7].length) != GE.W[7]) return false;
                weekdays.split('(', 2)[1].split(')', 2)[0].split(' ').forEach((time) => {
                    const times = time.split('-');
                    if(times[0] <= HR && HR < times[1]) resolve(true);
                });
                if(weekdays.substring(0, GE.W[7].length) != GE.W[7]) reject(false);
            });
            reject(false);
        }).then((result) => Callback(null, result))
        .catch((error) => Callback(error, null));
    }
}

module.exports = {check, match};