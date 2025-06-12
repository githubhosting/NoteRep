import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import LoadingNew from '@/components/LoadingNew'
import RoastAI from '@/components/RoastBot'
import { BadgeCheck, TrendingUp, Target } from 'lucide-react'

const SeeMarksCalculatorExplanation = () => {
  return (
    <div className="mx-auto my-4 max-w-3xl rounded-lg bg-white p-8 text-sm shadow-lg dark:bg-gray-800">
      <h1 className="mb-6 text-center text-xl font-extrabold text-gray-900 dark:text-white">
        SEE Marks Prediction Algorithm
      </h1>
      <p className="lg:text-md mb-4 text-sm text-gray-800 dark:text-gray-300">
        I have designed algorithm that predicts your SEE marks using a unique
        and powerful formula. This formula is the backbone of the entire SGPA
        predictor, and it’s what makes it so accurate. Here’s how it works:
      </p>
      <p className="mb-6 rounded bg-gray-100 p-4 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
        SEE Score = 50 * (1 - (1 - (Internal / 50)) ^ Exponent)
      </p>
      <p className="mb-4 text-gray-800 dark:text-gray-300">
        This formula takes two inputs: your internal score (out of 50) and an a
        exponent value. The exponent value is what makes this formula so
        powerful. It allows us to predict your SEE marks with incredible
        accuracy.
      </p>
      <ul className="mb-6 list-disc pl-6 text-gray-800 dark:text-gray-300">
        <li>
          <strong>Internal Score (Out of 50):</strong> This is your already
          earned score.
        </li>
        <li>
          <strong>SEE Score (Normalized to 50):</strong> Originally out of 100,
          we predict it using the formula above and then divide by 2 to convert
          it to a 50 point scale.
        </li>
        <li>
          <strong>Total Score (Out of 100):</strong> Simply the sum of your
          internal (50) and your normalized final (50).
        </li>
        <li>
          <strong>Grade Mapping:</strong> Your total score is then matched to a
          grade (O, A+, A, etc.) based on well defined thresholds.
        </li>
      </ul>
      <p className="mb-4 text-gray-800 dark:text-gray-300">
        The <strong>magic</strong> lies in the <em>exponent</em>:
      </p>
      <ul className="mb-6 list-disc pl-6 text-gray-800 dark:text-gray-300">
        <li>
          <strong>
            Minimum Expected (Exponent = 0.85): relatively easy to reach high
            SEE if internal is high.
          </strong>{' '}
          This conservative value reflects the harsh truth of finals—no matter
          how good your internals, reaching sky high finals marks is brutally
          hard.
        </li>
        <li>
          <strong>Most Likely (Exponent = 1.0): moderate difficulty.</strong> A
          balanced exponent that predicts where you’re truly headed.
        </li>
        <li>
          <strong>
            Maximum Potential (Exponent = 1.15): quite punishing near the top.
          </strong>{' '}
          When you leave nothing to chance and put in maximum effort, this
          optimistic exponent rewards you with a stellar predicted score.
        </li>
      </ul>
      <p className="lg:text-md text-sm text-gray-800 dark:text-gray-300">
        This SEE Marks Calculator is designed to show you exactly where you
        stand and what’s possible. Put simply, my main focus is that the
        difference between, say, 40 → 60 in SEE might be moderate, while the
        difference between 80 → 90 or 95 → 100 should be steep. Thus you won’t
        see an extremely high SEE predicted just because you have a 90+ internal
        score—unless you’re in the “maxeffort” scenario or you also have great
        attendance and an “easy-lab” factor.
      </p>
    </div>
  )
}

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [studentData, setStudentData] = useState(null)
  const [usn, setUsn] = useState('')
  const [dob, setDob] = useState('')
  console.log('Student Data:', studentData)

  // Theme detection and setting.
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Load user data from localStorage.
  useEffect(() => {
    const storedUsn = localStorage.getItem('usn')
    const storedDob = localStorage.getItem('dob')
    const storedStudentData = localStorage.getItem('studentData')
    if (storedUsn && storedDob) {
      setUsn(storedUsn)
      setDob(storedDob)
      if (storedStudentData) {
        try {
          setStudentData(JSON.parse(storedStudentData))
        } catch (e) {
          console.error('Error parsing student data from localStorage', e)
        }
      }
      setIsLoggedIn(true)
    }
  }, [])

  // The three SGPA predictions.
  const predictions = [
    {
      title: 'Minimum Expected',
      value: studentData?.predictions?.atleast?.predicted_sgpa || 'N/A',
      description: 'Your baseline grade with current effort',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-slate-800',
      icon: BadgeCheck,
    },
    {
      title: 'Most Likely',
      value: studentData?.predictions?.mostlikely?.predicted_sgpa || 'N/A',
      description: 'Expected grade based on your current performance',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-slate-800',
      icon: TrendingUp,
    },
    {
      title: 'Maximum Potential',
      value: studentData?.predictions?.maxeffort?.predicted_sgpa || 'N/A',
      description: 'Achievable with maximum effort',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-slate-800',
      icon: Target,
    },
  ]

  function addSGPAtoCGPA(sgpa, cgpa) {
    return (sgpa + 6 * cgpa) / 7
  }

  return (
    <>
      <Head>
        <title>SGPA Predictor | NoteRep</title>
        <meta
          name="description"
          content="Be amazed by SGPA prediction algorithm. Witness how internal scores and normalized exam marks combine to give your true academic potential."
        />
        <meta name="theme-color" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="noterep, sgpa predictor, academic analytics, student portal, Shravan"
        />
        <meta name="author" content="Shravan Revanna" />
      </Head>
      <div className="flex min-h-screen flex-col bg-indigo-50 dark:bg-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex flex-col items-center px-4 py-6 sm:py-8 lg:px-8">
          {/* Welcome & Prediction Title */}
          <div className="mb-6 max-w-3xl rounded-lg bg-indigo-50 px-6 py-6 shadow dark:bg-slate-800">
            <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
              Prepare to be Amazed by Your SGPA Prediction!
            </h1>
            <p className="mt-3 text-center text-sm text-gray-700 dark:text-gray-300">
              Using a algorithm that I have developed, where I combine your
              internal score (out of 50) with your final exam score (predicted)
              to generate a total out of 100. This total is then mapped to a
              grade using a predefined scale. The result? A precise prediction
              of your SGPA.
            </p>
          </div>

          {/* Prediction Cards */}
          {isLoggedIn ? (
            <section className="w-full max-w-3xl">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {predictions.map((pred, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-6 shadow ${pred.bgColor}`}
                  >
                    <div className="flex items-center">
                      <pred.icon className={`h-8 w-8 ${pred.color} mr-2`} />
                      <h2 className="lg:text-md font-bold">{pred.title}</h2>
                    </div>
                    <p className="mt-3 text-xl font-extrabold text-gray-900 dark:text-white">
                      {pred.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-200">
                      CGPA:{' '}
                      {addSGPAtoCGPA(pred.value, studentData.cgpa).toFixed(2)}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                      {pred.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Explanation Section */}
              <section className="mt-10 rounded-lg bg-white p-8 text-sm shadow dark:bg-gray-800">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  How it Works
                </h2>
                <ol className="list-decimal space-y-3 pl-6 text-gray-800 dark:text-gray-300">
                  <li>
                    <strong>Dual - Component Score:</strong> Each course’s score
                    is derived from two parts:
                    <ul className="mt-2 list-disc space-y-1 pl-6">
                      <li>
                        <strong>Internal (CIE) Score:</strong> Already awarded
                        out of <span className="font-medium">50 marks</span>.
                      </li>
                      <li>
                        <strong>Semester End Exam (SEE) Score:</strong>{' '}
                        Originally out of{' '}
                        <span className="font-medium">100 marks</span>, it’s
                        converted to a 50 point scale by dividing by 2.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Total Score:</strong> The two components are added
                    together:
                    <br />
                    <code className="mt-1 block rounded bg-gray-100 p-2 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                      Total Score = Internal (50) + (Final Exam Score / 2) (50)
                    </code>
                    This gives a total score out of{' '}
                    <span className="font-medium">100</span>.
                  </li>
                  <li>
                    <strong>Grade Mapping:</strong> The total score is then
                    mapped to a grade using the following scale:
                  </li>
                </ol>

                {/* Grade Threshold Table */}
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                          Range of Marks
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                          Grade
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                          Grade Point
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          Marks ≥ 90%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          O
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          10
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          ≥ 80% and &lt; 90%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          A+
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          09
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          ≥ 70% and &lt; 80%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          A
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          08
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          ≥ 60% and &lt; 70%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          B+
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          07
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          ≥ 55% and &lt; 60%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          B
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          06
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          ≥ 50% and &lt; 55%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          C
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          05
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          ≥ 40% and &lt; 50%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          P
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          04
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          Marks &lt; 40%
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          F
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                          00
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-6 text-gray-800 dark:text-gray-300">
                  For every course, the algorithm calculates your SGPA as the
                  weighted average of these grade points based on the course
                  credits. Whether you’re aiming for the conservative “Minimum
                  Expected,” the balanced “Most Likely,” or the sky-high
                  “Maximum Potential” outcome, this predictor gives an honest
                  yet empowering forecast of your results.
                </p>
              </section>
            </section>
          ) : (
            <>
              <div className="mt-8 text-center text-xl font-semibold text-gray-700 dark:text-gray-300">
                Please log in to view your predictions.
              </div>
              <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                <a href="/minisis">Log In</a>
              </button>
            </>
          )}
          <SeeMarksCalculatorExplanation />
          {isLoading && <LoadingNew />}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default HomePage
