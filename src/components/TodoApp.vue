<template>
  <div>
    <h1 class="text-center" style="color: #191923"><b>Awesome Todo App</b></h1>
    <div class="d-flex" style="margin-left: 4%">
      <el-input
        v-model="task"
        placeholder="Enter Your Task"
        class="w-50 m-1"
        clearable
      />
      <el-date-picker
        v-model="Due"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm"
        placeholder="Select date and time"
        class="w-50 m-1"
      />
      <el-button type="primary" class="me-5 mt-1" @click="submitTask" round
        >Add Task</el-button
      >
    </div>
    <div class="mt-5">
      <table class="container">
        <colgroup>
          <col span="1" style="width: 55%" />
          <col span="1" style="width: 15%" />
          <col span="1" style="width: 15%" />
          <col span="1" style="width: 15%" />
        </colgroup>
        <thead>
          <tr>
            <th><h1>Task</h1></th>
            <th><h1>Progress</h1></th>
            <th><h1>Due</h1></th>
            <th><h1>Actions</h1></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in tasks" :key="index">
            <td>
              <div @click="dueTime(task.taskDue)">
                <el-dialog
                  v-model="dialogDueVisible"
                  destroy-on-close
                  title="Due"
                  width="30%"
                  center
                >
                  <div v-if="dueEnd === false" style="padding-left: 13%">
                    <el-row>
                      <el-col class="text-center" :span="5">{{
                        displayDays
                      }}</el-col>
                      <el-col class="text-center" :span="5">{{
                        displayHours
                      }}</el-col>
                      <el-col class="text-center" :span="5">{{
                        displayMinutes
                      }}</el-col>
                      <el-col class="text-center" :span="5">{{
                        displaySeconds
                      }}</el-col>
                    </el-row>
                    <el-row>
                      <el-col class="text-center" :span="5">Days</el-col>
                      <el-col class="text-center" :span="5">Hours</el-col>
                      <el-col class="text-center" :span="5">Minutes</el-col>
                      <el-col class="text-center" :span="5">Seconds</el-col>
                    </el-row>
                  </div>
                  <div v-else>
                    <el-result
                      icon="error"
                      title="Due Ended"
                      sub-title="The Due for the task has been ended"
                    >
                    </el-result>
                  </div>
                  <template #footer>
                    <span class="dialog-footer">
                      <el-button @click="closeDue">Close</el-button>
                    </span>
                  </template>
                </el-dialog>
                {{ task.taskName }}
              </div>
            </td>
            <td>
              <el-checkbox v-model="task.taskProgress" size="large">
                <el-dialog
                  v-model="showResultDialog"
                  title="Congratulations"
                  width="30%"
                  center
                >
                  <el-result
                    icon="success"
                    title="Congratulations"
                    sub-title="You've successfully completed the Task"
                  />
                </el-dialog>
                <div v-if="task.taskProgress === true">Completed</div>
                <div v-else @click="showResultDialog = true">Incomplete</div>
              </el-checkbox>
            </td>
            <td>
              <div>
                {{ task.taskDue }}
              </div>
            </td>
            <td>
              <div class="row">
                <div class="col-md-4">
                  <el-button
                    type="primary"
                    @click="dialogEditVisible = true"
                    round
                    >Edit</el-button
                  >
                  <el-dialog
                    v-model="dialogEditVisible"
                    title="Edit Task"
                    center
                  >
                    <el-form :model="form">
                      <el-form-item
                        label="Task Name"
                        :label-width="formLabelWidth"
                      >
                        <el-input v-model="inputTask" autocomplete="off" />
                      </el-form-item>
                      <el-form-item label="Date" :label-width="formLabelWidth">
                        <el-date-picker
                          v-model="Due"
                          type="datetime"
                          format="YYYY-MM-DDTHH:mm:ss"
                          value-format="YYYY-MM-DD HH:mm"
                          placeholder="Select date and time"
                        />
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogEditVisible = false" round
                          >Cancel</el-button
                        >
                        <el-button type="primary" round @click="editTask(index)"
                          >Confirm</el-button
                        >
                      </span>
                    </template>
                  </el-dialog>
                </div>
                <div class="col-md-8" style="cursor: pointer">
                  <el-button type="danger" round @click="dialogVisible = true"
                    >Delete</el-button
                  >
                  <el-dialog
                    v-model="dialogVisible"
                    title="Delete Task"
                    width="30%"
                    center
                  >
                    <span>Do You want to Delete the Task</span>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="dialogVisible = false" round
                          >Cancel</el-button
                        >
                        <el-button
                          type="danger"
                          round
                          @click="deleteTask(index)"
                          >Confirm</el-button
                        >
                      </span>
                    </template>
                  </el-dialog>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <h4 v-if="tasks.length === 0" class="text-center emptymsg">
        Woah! Such an Empty, Enter New Tasks to Continue
      </h4>
    </div>
  </div>
</template>

<script>
import { ElButton } from "element-plus";
export default {
  name: "TodoApp",
  props: {
    msg: String,
  },
  components: {
    ElButton,
  },
  data() {
    return {
      task: null,
      editedTask: null,
      Due: null,
      formLabelWidth: "140px",
      inputTask: null,
      tasks: [],
      taskProgress: true,
      dialogVisible: false,
      dialogEditVisible: false,
      dialogDueVisible: false,
      showresultDialog: false,
      displaySeconds: 0,
      displayMinutes: 0,
      displayHours: 0,
      displayDays: 0,
      timer: null,
      dueEnd: false,
    };
  },
  computed: {
    _seconds() {
      return 1000;
    },
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
  },
  methods: {
    submitTask() {
      if (this.task.length === 0 || this.Due.length === 0) return;
      this.tasks.push({
        taskName: this.task,
        taskProgress: false,
        taskDue: this.Due,
      });
      this.task = null;
      this.Due = null;
      console.log(Date(this.Due));
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.dialogVisible = false;
    },
    editTask(index) {
      this.tasks[index].taskName = this.inputTask;
      this.tasks[index].taskDue = this.Due;
      this.dialogEditVisible = false;
    },
    dueTime(countDue) {
      this.dialogDueVisible = true;
      this.timer = setInterval(() => {
        const now = new Date();
        const deadline = new Date(countDue);
        const distance = deadline.getTime() - now.getTime();
        if (distance < 0) {
          clearInterval(this.timer);
          this.dueEnd = true;
        }
        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);
        this.displaySeconds = seconds < 10 ? "0" + seconds : seconds;
        this.displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        this.displayHours = hours < 10 ? "0" + hours : hours;
        this.displayDays = days < 10 ? "0" + days : days;
      }, 1000);
    },
    closeDue() {
      clearInterval(this.timer);
      this.dialogDueVisible = false;
      this.displaySeconds =
        this.displayMinutes =
        this.displayHours =
        this.displayDays =
          null;
      this.dueEnd = false;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap");
.emptymsg {
  width: 92%;
  margin: 0 auto;
  border-radius: 20px;
}
.container th h1 {
  font-weight: bold;
  font-size: 26px;
  text-align: left;
  color: #191923;
}
.container td {
  font-weight: normal;
  font-size: 1em;
  -webkit-box-shadow: 0 2px 2px -2px #0e1119;
  -moz-box-shadow: 0 2px 2px -2px #0e1119;
  box-shadow: 0 2px 2px -2px #0e1119;
  color: #191923;
}
.container {
  text-align: left;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  display: table;
  border-radius: 20px;
}
.container td,
.container th {
  padding-bottom: 2%;
  padding-top: 2%;
  padding-left: 2%;
}
.container tr {
  background-color: #f39237;
}
.container th {
  background-color: #0e79b2;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
