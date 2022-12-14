import { Component, OnInit } from '@angular/core';
import {Ejob} from "../EJobInterface";
import {EjobsService} from "../ejobs.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-ejobs',
  templateUrl: './list-ejobs.component.html',
  //styleUrls: ['./list-ejobs.component.css']
  styleUrls: ['../ejob.css']
})
export class ListEjobsComponent implements OnInit {

  searchJobForm!: FormGroup;

  displayedColumns: string[] = ['title', 'description', 'job_type', 'city', 'state', 'actions'];
  jobs: Array<Ejob> = [];
  dataSource: Array<Ejob> = [];

  constructor(
    private ejobService: EjobsService,
    private formBuilder : FormBuilder,
    private router: Router
  ) {

    this.ejobService.getJobs()
      .subscribe(
        (response) => {
          this.jobs = response;
          this.dataSource = this.jobs;
        }
      );

    this.searchJobForm = this.formBuilder.group({
      keyword: [],
      city: [],
      state: []
    });
  }

  ngOnInit(): void {
  }

  viewEJob(job: Ejob){
    this.router.navigate(['', 'employers', 'jobs', 'view', job._id]);
  }

  editEJob(job: Ejob){
    this.router.navigate(['', 'employers', 'jobs', 'edit', job._id]);
  }

  search() {
    const {keyword, city, state} = this.searchJobForm.value;
    if (!keyword && !city && !state) {
      this.dataSource = this.jobs;
    } else{
      this.dataSource = this.jobs
        .filter((job) => {
          if (!keyword) {
            return true;
          }
          return (job.title.includes(keyword));
        })
        .filter((job) => {
          if (!city) {
            return true;
          }
          return (job.location.city === city);
        })
        .filter((job) => {
          if (!state) {
            return true;
          }
          return (job.location.state === state);
        })
    }
  }
}
