// const serverUrl = "http://123.162.181.106:48080/test"
const serverUrl = "http://localhost:9080/test"
//const serverUrl = "http://localhost:8080/manage_war/"
global.constants = {
    // progress
    projectListByMid: serverUrl + '/project/getProjectByManagerId',
    progressList: serverUrl + '/progress/getProgressList',
    addProgress: serverUrl + '/progress/addProgressList',
    updateProgress: serverUrl + '/progress/updateProgressList',
    deleteProgress: serverUrl + '/progress/deleteProgressList',
    projectDetail: serverUrl + '/porject/projectDetail',
    technologySelect: serverUrl + '/technology/selectTechnology',
    updateTechnology: serverUrl + '/technology/updateTechnology',
    insertTechnology: serverUrl + '/technology/insertNewTechnology',
    deleteTechnology: serverUrl + '/technology/deleteNewTechnology',

    WorkPlaceSelect: serverUrl + '/workPlace/selectWorkPlace',
    updateWorkPlace: serverUrl + '/workPlace/updateWorkPlace',
    insertWorkPlace: serverUrl + '/workPlace/insertWorkPlace',
    deleteWorkPlace: serverUrl + '/workPlace/deleteWorkPlace',

    rightsList: serverUrl + '/manage1/setRight',

    //projectList
    projectList: serverUrl + '/project2/projectList',
    addProject: serverUrl + '/project1/addProject',
    deleteProject: serverUrl + '/project1/deleteProject',
    changeProject: serverUrl + '/project1/changeProject',
    getProject: serverUrl + '/project1/getProject',
    workPlaceList: serverUrl + '/workPlace/list',
    managerList: serverUrl+'/user/manager',
    //projectReport,upload
    getProjectEmployeeRoleList: serverUrl + '/project/getProjectEmployeeRoleList',
    getProjectReportList: serverUrl + '/projectReport/getProjectReportList',
    insertReport: serverUrl + '/projectReport/insertProjectReportList',
    downloadFile: serverUrl + '/upload/downloadFileEx',
    uploadFile: serverUrl + '/upload/uploadReport',
    //login
    login: serverUrl + '/web/login',
    sendCode: serverUrl + '/web/sendCode',
    codeMaching: serverUrl + '/web/codeMaching',
    logout: serverUrl + '/web/logout',
    getRole:serverUrl+'/manage1/selectRightByRole',
    setPerson:serverUrl+'/project1/setPerson',
    //hyz
    organizationChart: serverUrl + '/teamStructure/getTeamStructure',
    //register
    register: serverUrl + '/web/register',
    //getProjectDetail
    projectDetailSingle: serverUrl + '/project1/getProjectDetail',
    //manage1
    setRightList: serverUrl + '/manage1/setRight',
    insertRight: serverUrl + '/manage1/insertNewRight',
    deleteRight: serverUrl + '/manage1/deleteRight',
    updateRight: serverUrl + '/manage1/updateRight',

    setRoleList: serverUrl + '/manage1/Role',
    insertRole: serverUrl + '/manage1/insertNewRole',
    deleteRole: serverUrl + '/manage1/deleteRole',
    updateRole: serverUrl + '/manage1/updateRole',

    getEmployee: serverUrl + '/manage1/getEmployee',
    searchEmployee: serverUrl + '/manage1/search',
    deleteUser: serverUrl + '/manage1/deleteUser',
    updateUser: serverUrl + '/manage1/updateUser',
    changePassword: serverUrl + '/manage1/changePassword',
    selectItem: serverUrl + '/manage1/selectItem',
    //WorkPlace
    selectWorkPlace: serverUrl + '/workPlace/selectWorkPlace',
    selectTechnology: serverUrl + '/technology/selectTechnology',
    //project
    deleteGroup:serverUrl + '/project/deleteGroup',
    addGroup:serverUrl + '/project/addGroup',
    getGroupList:serverUrl + '/project/getGroupUser',
    getPersonList:serverUrl + '/project1/getPersonList',
    getGroupUser:serverUrl + '/project/getGroupUsers',
    getGroupPerson:serverUrl + '/project/getGroupPerson',
    //web
    insertUser:serverUrl + '/web/register',
    selectUsername:serverUrl + '/web/selectusername',
    //projectApply
    userList: serverUrl + '/projectApply/userList'

};




