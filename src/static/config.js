const serverUrl = "http://localhost:9080/pages"
//const serverUrl = "http://localhost:8080/manage_war/"
global.constants = {
    // create by ljh ---begin
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
    // create by ljh ---end

    //gsl用到的后端接口
    projectList: serverUrl + '/project2/projectList',
    addProject: serverUrl + '/project1/addProject',
    deleteProject: serverUrl + '/project1/deleteProject',
    changeProject: serverUrl + '/project1/changeProject',
    getProject: serverUrl + '/project1/getProject',
    workPlaceList: serverUrl + '/workPlace/list',
    managerList: serverUrl+'/user/manager',

    //dzh
    login: serverUrl + '/web/login',
    sendCode: serverUrl + '/web/sendCode',
    codeMaching: serverUrl + '/web/codeMaching',
    logout: serverUrl + '/web/logout',
    getRole:serverUrl+'/manage1/selectRightByRole',
    //hyz
    organizationChart: serverUrl + '/teamStructure/getTeamStructure',
    //yxy
    register: serverUrl + '/web/register',
    //dzw
    projectDetailSingle: serverUrl + '/project1/getProjectDetail',
    //ln
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
    //刘宁用到的工作地点和技术领域接口
    selectWorkPlace: serverUrl + '/workPlace/selectWorkPlace',
    selectTechnology: serverUrl + '/technology/selectTechnology',
    //xjs
    deleteGroup:serverUrl + '/project/deleteGroup',
    addGroup:serverUrl + '/project/addGroup',
    projectList:serverUrl + '/project2/projectList',
    getGroupList:serverUrl + '/project/getGroupList',
    getPersonList:serverUrl + '/project1/getPersonList?id&pageNo',
    //yxy
    insertUser:serverUrl + '/web/register',
    selectUsername:serverUrl + '/web/selectusername'
};
