'use client'

import { TestBasicInfo, SubjectiveTestBasicInfo } from '@/components/molecules/test/TestBasicInfo'
import { ProblemList, Problem } from '@/components/molecules/test/ProblemList'
import { ActionButtons } from '@/components/molecules/test/ActionButtons'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const initialProblem = {
  id: generateUniqueId(),
  number: 1,
  image: '',
  title: '',
  description: '',
  answers: [''],
  score: undefined,
}

const initialBasicInfo: SubjectiveTestBasicInfo = {
  mainImage: '',
  title: '',
  subtitle: '',
  description: '',
  category: '',
  tags: '',
}

export function SubjectiveTestForm() {
  const [basicInfo, setBasicInfo] = useState<SubjectiveTestBasicInfo>(initialBasicInfo)
  const [problems, setProblems] = useState<Problem[]>([initialProblem])

  const addProblem = () => {
    setProblems([
      ...problems,
      {
        id: generateUniqueId(),
        number: problems.length + 1,
        image: '',
        title: '',
        description: '',
        answers: [''],
        score: undefined,
      },
    ])

    setTimeout(() => {
      window.scrollBy({ top: 500, behavior: 'smooth' })
    }, 100)
  }

  const removeProblem = (problemId: string) => {
    if (problems.length > 1) {
      const newProblems = problems
        .filter((p) => p.id !== problemId)
        .map((problem, index) => ({
          ...problem,
          number: index + 1,
        }))
      setProblems(newProblems)
    }
  }

  const addAnswer = (problemIndex: number) => {
    const newProblems = [...problems]
    newProblems[problemIndex].answers.push('')
    setProblems(newProblems)
  }

  const removeAnswer = (problemIndex: number, answerIndex: number) => {
    const newProblems = [...problems]
    if (newProblems[problemIndex].answers.length > 1) {
      newProblems[problemIndex].answers.splice(answerIndex, 1)
      setProblems(newProblems)
    }
  }

  const handleProblemChange = (index: number, updatedProblem: Problem) => {
    const newProblems = [...problems]
    newProblems[index] = updatedProblem
    setProblems(newProblems)
  }

  const resetForm = () => {
    setBasicInfo(initialBasicInfo)
    setProblems([
      {
        id: generateUniqueId(),
        number: 1,
        image: '',
        title: '',
        description: '',
        answers: [''],
        score: undefined,
      },
    ])
    toast.success('페이지 초기화 완료.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSave = () => {
    console.log('Save:', { basicInfo, problems })
  }

  return (
    <div className="pb-20">
      <TestBasicInfo info={basicInfo} onChange={setBasicInfo} />
      <ProblemList
        problems={problems}
        onAddProblem={addProblem}
        onRemoveProblem={removeProblem}
        onAddAnswer={addAnswer}
        onRemoveAnswer={removeAnswer}
        onProblemChange={handleProblemChange}
      />
      <ActionButtons onReset={resetForm} onSave={handleSave} />
    </div>
  )
}
