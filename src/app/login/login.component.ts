import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';
import { ResetComponent } from './reset/reset.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: boolean;
  private user: User;
  @Output() showSpiner: boolean;
  loading = true;

  form:FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService:LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { 
    this.user = new User();
  }

  ngOnInit(): void {
    this.gerarForm();
    this.carregar();
  }

  carregar(){
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }  

  gerarForm(){
    this.form = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.min(6)]]
    });

  }

  onSubmit(){
   this.loading = true;
   this.user = this.form.value;
   this.loginService.logar(this.user)
    .subscribe(data=>{
      this.loading = false;
        localStorage['token'] = data.result.token;
        localStorage['user'] = JSON.stringify(data.result);
        const rules = data.result.rules;    
        rules.forEach(element => {
          if(element.Filiado){
            this.router.navigate(['/filiado']);
          }else if(element.Competidor){
            this.router.navigate(['/filiado']);
          }
          else if(element.Admin){
            this.router.navigate(['/admin']);
          }else{
            this.router.navigate(['/login']);
          }
        });
             
      },
      err =>{
        this.loading = false;
        console.log('erro')
        let msg: string = err.error.text;
        if(err['status']==401){
          msg = "Email/senha invalidos";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      }
    )
  }

  esqueciSenha(){
    let email = '';
    const dialogRef = this.dialog.open(ResetComponent, {
      width: '40%',
      data: email
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.form.value.email = result; 
    });
  }
  
  loginGoogle(){
    this.loginService.loginGoogle()
    .subscribe(response =>{
      this.loading = false;
      console.log(response);
    },  err =>{
      console.log('erro')
      console.log(err)
    });
  }

}
