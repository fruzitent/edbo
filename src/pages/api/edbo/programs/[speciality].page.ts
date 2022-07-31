import {
  getPrograms,
  ProgramsRequest,
  ProgramsResponse,
} from 'edbo/src/lib/edbo'

import type { NextApiHandler, NextApiRequest } from 'next'

// prettier-ignore
const getArgs = (req: NextApiRequest): ProgramsRequest => { /* eslint-disable camelcase */
  const course         = req.query.course         as ProgramsRequest["course"]
  const education_base = req.query.education_base as ProgramsRequest["education_base"]
  const education_form = req.query.education_form as ProgramsRequest["education_form"]
  const qualification  = req.query.qualification  as ProgramsRequest["qualification"]
  const region         = req.query.region         as ProgramsRequest["region"]
  const speciality     = req.query.speciality     as ProgramsRequest["speciality"]
  const study_program  = req.query.study_program  as ProgramsRequest["study_program"]
  const university     = req.query.university     as ProgramsRequest["university"]
  return {
    course,
    education_base,
    education_form,
    qualification,
    region,
    speciality,
    study_program,
    university,
  }
}

const handler: NextApiHandler<ProgramsResponse> = async (req, res) => {
  const args = getArgs(req)
  const program = await getPrograms(args)
  res.status(200).json(program)
}

export default handler
