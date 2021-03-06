import _ from 'lodash';
import { IncidentRule, GRADES } from '../incident-rule';

export default class TravelDistance extends IncidentRule {
  constructor(incident) {
    super(incident);
    this.description = 'Travel distance should be less than 4 miles';
    this.category = 'StatEngine';
  }

  applicable() {
    if (_.isNil(this.incident.travelMatrix) || _.isEmpty(this.incident.travelMatrix)) return false;
    return true;
  }

  getEvidence() {
    const evidence = [];

    _.forOwn(this.incident.travelMatrix, (data, unitId) => {
      let grade = GRADES.SUCCESS;

      if(data.distance > 4) grade = GRADES.DANGER;
      evidence.push({
        text: `${unitId} travel distance was ${data.distance.toFixed(2)} miles.`,
        grade
      });
    });

    return evidence;
  }
}
