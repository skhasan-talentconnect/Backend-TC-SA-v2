import { predictSchoolsService } from '../services/predictor-services.js';
import { toSchoolCardModels } from '../utils/utils.js';

export const predictSchools = async (req, res) => {
  try {
    const filters = req.body;
    
    if (!filters || Object.keys(filters).length === 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Request body is required'
      });
    }
    const matchedSchools = await predictSchoolsService(filters);
    const mappedSchools = await toSchoolCardModels(matchedSchools);

 res.status(200).json({
      status: 'success',
      message: 'Result of school predictor',
      total: mappedSchools.length,
      data: mappedSchools,
    });
  }catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    });
  }
};
