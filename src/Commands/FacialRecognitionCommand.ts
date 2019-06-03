import { Command, CommandBase, CommandParser, Event } from '@autobot/common';
import { RichEmbed }                                  from "discord.js";

const vision = require('@google-cloud/vision');

/**
 * Delete a HelpDesk Tag.
 * Note: The tag must not be in use by questions!
 *
 * Example: !tagdelete name=<tagname>
 *
 */
@Command
export class FacialRecognitionCommand extends CommandBase {

    public constructor() {

        super({

            event: Event.MESSAGE,
            name: `${ process.env.VISION_BOT_COMMAND_PREFIX }face`,
            group: 'help',
            description: 'Deletes a HelpDesk Tag.',
            requiredEnvVars: [ 'VISION_BOT_COMMAND_PREFIX', 'VISION_BOT_ADMIN_ROLE', 'GOOGLE_APPLICATION_CREDENTIALS' ],
            roles: [ process.env.VISION_BOT_ADMIN_ROLE ]

        });

    }

    public async run(command: CommandParser) {

        const client = new vision.ImageAnnotatorClient();

        const [ result ] = await client.faceDetection(command.arguments[ 0 ].name);

        if (result.faceAnnotations) {

            console.log(result);

            command.obj.reply(new RichEmbed().setTitle('Facial Recognition Results')
                                             .addField('Joy Likelihood', result.faceAnnotations[ 0 ].joyLikelihood)
                                             .addField('Sorrow Likelihood', result.faceAnnotations[ 0 ].sorrowLikelihood)
                                             .addField('Anger Likelihood', result.faceAnnotations[ 0 ].angerLikelihood)
                                             .addField('Surpise Likelihood', result.faceAnnotations[ 0 ].surpriseLikelihood)
                                             .addField('Under Exposed Likelihood', result.faceAnnotations[ 0 ].underExposedLikelihood)
                                             .addField('Blurred Likelihood', result.faceAnnotations[ 0 ].blurredLikelihood)
                                             .addField('Headwear Likelihood', result.faceAnnotations[ 0 ].headwearLikelihood)
                                             .setImage(command.arguments[ 0 ].name)
                                             .setFooter(command.arguments[ 0 ].name));

        } else {

            command.obj.reply(new RichEmbed().setTitle('Facial Recognition Results').setDescription(`Results could not be processed for "${ command.arguments[ 0 ].name }"! :sob:`));

        }

    }

}
