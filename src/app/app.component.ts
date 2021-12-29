import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  errorMessage = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = []; // an array of arrays of strings :)
  currentDate = new Date();

  onNumberOfTeamsInput(value: string) {   //takes in a value of string: how we declare type when a parameter
    this.numberOfTeams = Number(value); //declaring a type of Number (when assigning value to variable)
  }
  onInput(member: string) {
    this.newMemberName = member;
    console.log(this.newMemberName);
  }
  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty!";
      return;
    }
    this.errorMessage = '';
    this.members.push(this.newMemberName); //pushes actual newMemberName into array of members
    this.newMemberName = '';
  }

  generateTeams() {
    if(!this.numberOfTeams || this.numberOfTeams <= 0){
      this.errorMessage = "Invalid number of teams";
      return;
    };

    if(this.members.length < this.numberOfTeams){
      this.errorMessage = "Not enough members";
      return;
    }
    this.errorMessage = '';
    
    const allMembers = [...this.members]; //not mutating the state only mutating the copy of it which we have as "allMembers" instead of using members from the state

    while(allMembers.length) {
    // while because you don't want loop just one time, but as long as there are members in input
      for(let i=0; i<this.numberOfTeams; i++){
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        //console.log(randomIndex);
        const member = allMembers.splice(randomIndex, 1)[0];
        if(!member) break; // to get out of loop when no member to distribute to teams --> NO undefined item in array
        console.log(member) 
        // creates a new "spliced out" array, but we want only first one to store in member
        if(this.teams[i]){
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    };
    this.members = [];
    this.numberOfTeams = '';
  }
}
