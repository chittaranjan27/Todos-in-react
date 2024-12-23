import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let toString = localStorage.getItem("todos")
    if (toString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-10 p-8 rounded-2xl bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 shadow-xl min-h-[70vh] md:w-3/5">
        <h1 className='font-bold text-center text-3xl text-indigo-900 mb-6'>iTask - Manage Your Todos</h1>

        <div className="addTodo my-8 flex flex-col gap-6">
          <h2 className='text-lg font-semibold text-indigo-800'>Add a Todo</h2>
          <div className="flex gap-4 items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task"
              className='w-full rounded-full px-6 py-3 border border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500 text-indigo-700 shadow-lg placeholder-indigo-400'
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className='bg-indigo-600 disabled:bg-indigo-400 hover:bg-indigo-800 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300'
            >
              Save
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 my-8">
          <input
            className='w-5 h-5 accent-indigo-600 rounded focus:ring-4 focus:ring-indigo-500'
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label className='text-indigo-800 font-medium text-lg'>Show Finished</label>
        </div>

        <h2 className='text-xl font-semibold text-indigo-800 mb-4'>Your Todos</h2>
        <div className="todos space-y-4">
          {todos.length === 0 && <div className='text-indigo-700 italic'>No Todo to Display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between items-center p-4 bg-white rounded-lg shadow-lg border border-indigo-300 hover:shadow-xl transition-all duration-300">
                <div className='flex items-center gap-4'>
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className='w-6 h-6 accent-indigo-600 rounded focus:ring-4 focus:ring-indigo-500'
                  />
                  <div className={item.isCompleted ? "line-through text-indigo-500" : "text-indigo-800 font-medium text-lg"}>{item.todo}</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => { handleEdit(e, item.id) }}
                    className='bg-indigo-600 hover:bg-indigo-800 rounded-full p-3 text-white shadow-lg transition-all duration-300 flex items-center justify-center'
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={(e) => { handleDelete(e, item.id) }}
                    className='bg-red-600 hover:bg-red-800 rounded-full p-3 text-white shadow-lg transition-all duration-300 flex items-center justify-center'
                  >
                    <AiFillDelete size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
