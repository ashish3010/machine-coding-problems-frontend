import { useState } from "react";
import "./styles.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState([]);

  const onAddTask = () => {
    setTodoList((prev) => [
      ...prev,
      { timeStamp: Date.now(), task: inputValue, lastUpdate: Date.now() }
    ]);
    setInputValue(" ");
  };

  const formatTime = (time) => new Date(time).toLocaleString();

  const onUpdateTask = ({
    e,
    timeStamp,
    isDone,
    isEdit,
    editOp,
    updateOp,
    lastUpdate
  }) => {
    const updatedList = todoList?.map((item) => {
      if (item?.timeStamp === timeStamp) {
        if (updateOp) {
          return {
            ...item,
            task: e.target.value,
            isSaveDisabled: !e.target.value?.trim()
          };
        }
        if (editOp) {
          return {
            ...item,
            isEdit: !isEdit,
            lastUpdate: isEdit ? Date.now() : lastUpdate
          };
        }
        return { ...item, isDone: !isDone, lastUpdate: Date.now() };
      }
      return item;
    });
    setTodoList(updatedList);
  };

  return (
    <div className="App">
      <div>
        <input
          value={inputValue}
          disabled={todoList?.find((item) => item?.isEdit)}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button disabled={!inputValue?.trim()} onClick={onAddTask}>
          Add
        </button>
      </div>
      <div>
        {todoList?.map(
          ({ task, timeStamp, isDone, isEdit, isSaveDisabled, lastUpdate }) => (
            <div
              key={timeStamp}
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <div style={{ display: "flex", gap: 16 }}>
                <input
                  type="checkbox"
                  checked={isDone}
                  style={{ pointerEvents: "none" }}
                />
                {isEdit ? (
                  <input
                    value={task}
                    onChange={(e) =>
                      onUpdateTask({ e, timeStamp, updateOp: true })
                    }
                  />
                ) : (
                  <p>{task}</p>
                )}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <button
                  disabled={isEdit}
                  onClick={() => onUpdateTask({ timeStamp, isDone, isEdit })}
                >
                  {isDone ? "reopen" : "done"}
                </button>
                <button
                  disabled={isEdit && isSaveDisabled}
                  onClick={() =>
                    onUpdateTask({
                      timeStamp,
                      isDone,
                      isEdit,
                      editOp: true,
                      lastUpdate
                    })
                  }
                >
                  {isEdit ? "save" : "edit"}
                </button>
                <button
                  disabled={isEdit}
                  onClick={() =>
                    setTodoList(
                      todoList?.filter((item) => item?.timeStamp !== timeStamp)
                    )
                  }
                >
                  delete
                </button>
                <p>last updated: {formatTime(lastUpdate)}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
