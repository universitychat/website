import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { Person } from '../shared/models/person';
import { NicknameService } from '../shared/services/nickname.service';

@Component({
  selector: 'app-nickname',
  templateUrl: './nickname.component.html',
  styleUrls: ['./nickname.component.css']
})
export class NicknameComponent implements OnInit{

	public init_nickname = ''
	public exit_msg = '';

	constructor(private _nicknameService: NicknameService) {}

	public ngOnInit(): void {}

	public save_nickname(nickname: string): void {
    
		// Empty Nickname
		if (!nickname) {
			this.exit_msg = 'Bitte erstelle Einen Nickname';
			return
		}
		// Check whether multiple words
		if (nickname.includes(' ')) {
			this.exit_msg = 'Dein Nickname darf keine Leerzeichen beinhalten';
			return
		}

		// Maximum character length
		if (nickname.length > 8) {
			this.exit_msg = 'Dein Nickname darf maximal 8 Zeichen haben';
		}

		const nick_item = {
			nickname: nickname
		}

		this._nicknameService.register_nickname(nick_item).subscribe(
			(response: any) => {
				if (response.exists === true) {
					this.exit_msg = "Dieser Nickname ist bereits vergeben"
				} else {
					Person.Nickname = nickname;
					this.exit_msg = "Du schreibst jetzt als " + response.nickname
				}
			},
			
			(error: any) => {
				this.exit_msg = error
			}

		)

    return

  }
}