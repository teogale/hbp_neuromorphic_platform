describe('Coordinator controller and factory', function() {
    window.base_url = 'https://127.0.0.1:8001';
    window.ver_api = '/v1/api';
    var user_test = '304621';
    var project_test = '1542c7cd-497a-4cf1-a689-c19eac3dc1a0';

    var User, Projects, Quotas;
    var $httpBackend;

    var testUser = {};
    var testProject = {
        "status": "accepted", 
        "description": "project01 description", 
        "title": "project01", 
        "abstract": "project01 abstract", 
        "collab": "4293", 
        "quotas": [], 
        "duration": 5, 
        "context": "1542c7cd-497a-4cf1-a689-c19eac3dc1a0", 
        "owner": "304621", 
        "start_date": "2018-05-16", 
        "resource_uri": "/projects/1542c7cd-497a-4cf1-a689-c19eac3dc1a0"
    };
    beforeEach(angular.mock.module('request-coordinator-app'));

    beforeEach(inject(function(_User_, _Projects_, _Quotas_, _$httpBackend_) {
        User = _User_;
        Projects = _Projects_;
        Quotas = _Quotas_;
        $httpBackend = _$httpBackend_;
    }));
    beforeEach(function() {
        // Initialize our local result object to an empty object before each test
        result = {};
    });

    describe('RequestListController', function(){
        var $controller, $rootScope, controller, Projects, User;
        beforeEach(inject(angular.mock.inject(function(_$controller_, _$rootScope_, _Projects_, _User_){
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            Projects = _Projects_;
            User = _User_;

            spyOn(User, 'get').and.callThrough();
            spyOn(Projects, 'get').and.callThrough();
            // spyOn(Projects, 'put').and.callThrough();
            spyOn(Quotas, 'get').and.callThrough();  

            controller = $controller('RequestListController', { $scope: $scope });;
        })));
        it('should exist User Factory', function() {
            expect(User).toBeDefined();
        });
        it('test result User factory', function() {
            $httpBackend.expectGET("https://services.humanbrainproject.eu" + window.ver_api + "/user/" + user_test).respond(testUser);
            expect(User).not.toHaveBeenCalled();
            expect(result).toEqual({});
            var rs1;
            rs1 = User.get({id:'1'}, function(res){
                result = res;
            });
            // Flush pending HTTP requests
            $httpBackend.flush();
    
        });
        it('should exist Projects Factory', function() {
            expect(Projects).toBeDefined();
        });
        it('test Projects factory', function(){
            $httpBackend.expectGET(base_url + "/projects/" + project_test).respond(testProject);
            expect(Projects.id).not.toHaveBeenCalled();
            expect(result).toEqual({});
            var rs1;
            rs1 = Projects({id:project_test}, function(res){
                result = res;
            });
            
            // Flush pending HTTP requests
            $httpBackend.flush();
            expect(Projects).toHaveBeenCalledWith({id:project_test}, jasmine.any(Function));
            expect(result).toBeDefined();
            expect(result.description).toEqual(testProject.description);
        });
        it('should exist Quotas Factory', function() {
            expect(Quotas).toBeDefined();
        });
        it('RequestListController controller should be defined', function() {
            expect(controller).toBeDefined();
        });
        it('test $scope.setTab', function() {
            var array_tab = ['under review', 'accepted', 'rejected', 'in preparation'];
            for(var i= 0; i < array_tab.length; i++)
            {
                console.log("test $scope.setTab('"+array_tab[i]+"')");
                $scope.setTab(array_tab[i]);
                expect($scope.css[array_tab[i]]).toEqual('btn btn-primary');
                expect($scope.selectedTab).toEqual(array_tab[i]);
            }
        });
        it('test Projects.query', function() {
            // $httpBackend.flush();
            // console.log("Projects : " + Projects.query());
            // toto = Projects.query();
            // console.log("$scope.projects : " + $scope.projects);
        });
    });

    describe('RequestDetailController', function(){
        var $controller, $rootScope, controller, Projects, Quotas, User;
        beforeEach(inject(angular.mock.inject(function(_$controller_, _$rootScope_, _Projects_, _Quotas_, _User_){
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            Projects = _Projects_;
            Quotas = _Quotas_;
            User = _User_;
            controller = $controller('RequestDetailController', { $scope: $scope });;
        })));
        it('RequestDetailController controller should be defined', function() {
            expect(controller).toBeDefined();
        });
        // it('test $scope.accept', function($scope) {
        //     $scope.accept();
        //     $httpBackend.flush();
        //     expect(project["status"]).toEqual("accepted");
        // });
        if('test addQuota', function($scope){
            $scope.addQuota();
        });
    });
});